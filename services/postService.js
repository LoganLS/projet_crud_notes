const postDao = require("../dao/postDao");

module.exports={
    get(connection){
        return postDao.get(connection);
    },
    insert(connection,note){
        return postDao.insert(connection,note);
    },
    update(connection,idNote,note){
        const updateNote = {
            description : note.description,
            title : note.title+" (modified)"
        };
        console.log(updateNote);
        return postDao.update(connection,idNote,updateNote);
    },
    delete(connection,idNote){
        return postDao.delete(connection,idNote);
    }
};