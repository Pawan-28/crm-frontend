import React from 'react';

const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search or filter to find what you\'re looking for.',
  icon: Icon,
  action,
}) => {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
          <Icon className="h-16 w-16" />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;