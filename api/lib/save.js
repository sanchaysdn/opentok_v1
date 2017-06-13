 utility.encryptedRecord = function encryptedRecord(data,field,callback) {
    var patientObj = {};
    var fields = [];
    if(field.length>0){
       for(var i=0; i<field.length; i++){
        fields.push(field[i]);
       };
    }    
    for (var key in data) {
       if(fields.indexOf(key) == -1){
          if(data[key]){
             if(data[key] instanceof Array){
                 if (data[key].length > 0) {
                        for (let j = 0; j < data[key].length; j++) {
                          if (typeof (data[key][j]) == 'object') {
                            for (var arrObjkey in result[key][j]) {
                              if (fields.indexOf(arrObjkey) == -1) {
                                if (result[arrObjkey]) {
                                  patientObj[key][j] = encrypt(result[arrObjkey].toString());  
                                }
                              } else {
                                patientObj[key][j] = result[arrObjkey];  
                              }
                            }
                          } else if (typeof (result[key][j]) == 'string') {
                            patientObj[key][j] = encrypt(result[key][j].toString());  
                          }
                        }
                      } else {
                        patientObj[key] = result[key];      
                    }
             } else {
                 patientObj[key] = encrypt(data[key].toString());
             }  
          }      
        } else {
                  patientObj[key] = data[key];
        } 
           
    }
  callback(patientObj); 
}