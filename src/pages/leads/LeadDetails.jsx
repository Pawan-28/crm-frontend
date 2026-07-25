import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import LeadStatusBadge from '../../components/leads/LeadStatusBadge';
import { getLead, getLeadNotes, getLeadActivities, addLeadNote, changeLeadStatus, deleteLead } from '../../services/leads';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const LeadDetails = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const fetchLeadDetails = async () => {
    try {
      setLoading(true);
      const [leadRes, notesRes, activitiesRes] = await Promise.all([
        getLead(id),
        getLeadNotes(id),
        getLeadActivities(id),
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Failed to fetch lead details:', error);
      toast.error('Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusLoading(true);
      await changeLeadStatus(id, newStatus);
      toast.success('Status updated successfully');
      fetchLeadDetails();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setNoteLoading(true);
      await addLeadNote(id, { note: newNote });
      toast.success('Note added successfully');
      setNewNote('');
      fetchLeadDetails();
    } catch (error) {
      toast.error('Failed to add note');
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${lead?.full_name}"?`)) {
      try {
        await deleteLead(id);
        toast.success('Lead deleted successfully');
        navigate('/leads');
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!lead) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Lead not found</p>
          <Link to="/leads" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Back to Leads
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link to="/leads" className="text-gray-500 hover:text-gray-700">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lead.full_name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <LeadStatusBadge status={lead.status} />
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{lead.source_display}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <>
                <Link to={`/leads/${id}/edit`} className="btn-secondary flex items-center space-x-2">
                  <PencilIcon className="h-5 w-5" />
                  <span>Edit</span>
                </Link>
                <button onClick={handleDelete} className="btn-danger flex items-center space-x-2">
                  <TrashIcon className="h-5 w-5" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lead Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{lead.phone || '-'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{lead.company || '-'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Source</p>
                    <p className="text-gray-900">{lead.source_display}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="text-gray-900">{lead.assigned_to_detail?.full_name || 'Unassigned'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
              
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="input-field"
                  />
                  <button
                    type="submit"
                    disabled={noteLoading || !newNote.trim()}
                    className="btn-primary flex items-center space-x-1 disabled:opacity-50"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-sm">No notes yet</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-900">{note.note}</p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {note.user_detail?.full_name || note.user_detail?.username}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(note.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Status & Activities */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
              <div className="space-y-2">
                {['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={statusLoading || lead.status === status}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      lead.status === status
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="capitalize">{status.replace('_', ' ')}</span>
                    {lead.status === status && (
                      <span className="float-right text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.length === 0 ? (
                  <p className="text-gray-500 text-sm">No activities yet</p>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="border-l-2 border-gray-200 pl-4">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {activity.user_detail?.full_name || activity.user_detail?.username}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">
                          {new Date(activity.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeadDetails;