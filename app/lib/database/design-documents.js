module.exports = function (db) {
  
  db.save('_design/tasks', {
    views: {
      all: {
        map: 'function (doc) { if (doc.type === "task") { emit(doc._id, doc); } }'
      },
      byResource: {
        map: 'function (doc) { if (doc.type === "task") { doc.resources.forEach(function (resource) { emit(resource, doc) }); } }'
      },
      byZipCode: {
        map: 'function (doc) { if (doc.type === "task") { emit(doc.zip, doc); } }'
      },
      byZipAndResource: {
        map: 'function (doc) { if (doc.type === "task") { doc.resources.forEach(function (resource) { emit([doc.zip, resource], doc) }); } }'
      }
    }
  });
  
  db.save('_design/users', {
    views: {
      all: {
        map: 'function (doc) { if (doc.type === "user") { emit(doc._id, doc); } }'
      }
    }
  });
  
};