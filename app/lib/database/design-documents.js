module.exports = function (db) {
  db.save('_design/task', {
    views: {
      tasks: {
        map: 'function (doc) { if (doc.type === "task") { emit(doc._id, doc); } }'
      },
      tasksByResource: {
        map: 'function (doc) { if (doc.type === "task") { doc.resources.forEach(function (resource) { emit(resource, doc) }); } }'
      },
      tasksByZipCode: {
        map: 'function (doc) { if (doc.type === "task") { emit(doc.zip, doc); } }'
      }
    }
  });
  
  return db;
}