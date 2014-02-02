module.exports = function (db) {
  db.save('_design/task', {
    views: {
      byUsername: {
        map: 'function (doc) { if (doc.type === 'task') { emit(doc._id, doc) } }'
      }
    }
  }); 
}