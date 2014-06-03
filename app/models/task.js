var Mongo = require('mongodb');
var taskCollection = global.nss.db.collection('tasks');
var _ = require('lodash');

class Task{
  static create(userId, obj, fn){
    if(typeof userId === 'string'){userId = Mongo.ObjectID(userId);}

    var task = new Task();
    task.title = obj.title;
    task.due = new Date(obj.due);
    task.color = obj.color;
    task.isComplete = false;
    task.userId = userId;

    taskCollection.save(task, (e,t)=>fn(t));
  }

  static findById(id, fn){
    if(id.length !== 24){fn(null); return;}

    id = Mongo.ObjectID(id);
    taskCollection.findOne({_id:id}, (e,t)=>{
      if(t){
        t = _.create(Task.prototype, t);
        fn(t);
      }else{
        fn(null);
      }
    });
  }

  static findByUserId(userId, fn){
    if(userId.length !== 24){fn(null); return;}

    userId = Mongo.ObjectID(userId);
    taskCollection.find({userId:userId}).toArray((e,ts)=>fn(ts));
  }
}

module.exports = Task;
