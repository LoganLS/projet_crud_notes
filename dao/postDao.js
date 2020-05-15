module.exports={
    get(connection){
        return new Promise((resolve,reject) =>{
            connection.query('SELECT * FROM note', function(error, results, fields){
                if(error){
                    return reject(error);
                }else{
                    resolve(results);
                }
            })
        })
    },
    insert(connection, note){
        return new Promise((resolve,reject) =>{
            connection.query('INSERT INTO note(title,description) VALUES(?,?)',[note.title,note.description], function(error, results, fields){
                if(error){
                    return reject(error);
                }else{
                    resolve(results);
                }
            })
        })
    },
    update(connection, idNote, note){
        return new Promise((resolve,reject) =>{
            connection.query('UPDATE note SET title = ?, description = ? WHERE id = ?',[note.title, note.description, idNote], function(error, results, fields){
                if(error){
                    return reject(error);
                }else{
                    resolve(results);
                }
            })
        })
    },
    delete(connection, idNote){
        return new Promise((resolve,reject) =>{
            connection.query('DELETE FROM note WHERE id = ?',[idNote], function(error, results, fields){
                if(error){
                    return reject(error);
                }else{
                    resolve(results);
                }
            })
        })
    }
}