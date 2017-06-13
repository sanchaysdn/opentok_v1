'use strict';

/* DB */
var mongoose = require('mongoose');
require('../api/models/Roles');
require('../api/models/Users');
require('../api/models/Ambulatories');
require('../api/models/AmbulatoryActions');
require('../api/models/AmbulatoryMessages');
require('../api/models/AssesmentQuestionOptions');
require('../api/models/AssesmentQuestions');
require('../api/models/CareCoordinators');
require('../api/models/Clinicians');
require('../api/models/Conversations');
require('../api/models/Devices');
require('../api/models/Diseases');
require('../api/models/Emails');
require('../api/models/Hospitals');
require('../api/models/HospitalsAmbulances');
require('../api/models/IvrSettings');
require('../api/models/LabTests');
require('../api/models/Messages');
require('../api/models/PatientAllergicReactions');
require('../api/models/PatientAssesments');
require('../api/models/PatientChronicDiseases');
require('../api/models/PatientDemographics');
require('../api/models/PatientDiseases');
require('../api/models/PatientDeviceConfigs');
require('../api/models/PatientEncounter');
require('../api/models/PatientFamilyHistories');
require('../api/models/PatientInsurances');
require('../api/models/PatientMedications');
require('../api/models/PatientSurgeries');
require('../api/models/PatientVitals');
require('../api/models/Populations');
require('../api/models/Prescriptions');
require('../api/models/TowingMessages');
require('../api/models/Towings');
require('../api/models/VideoCallRequests');
require('../api/models/Patients');
require('../api/models/TowingReqActions');



var uri = 'mongodb://172.10.1.7/iotied';

var options = {
	user: 'iotied',
  	pass: 'iotied87656!!'
}

/*var uri = 'mongodb://52.39.212.226/ads';

var options = {
	user: 'ads',
  	pass: 'ads@%$%^'
}
*/
mongoose.connect(uri,options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function(callback) {
    console.log('Database connection successful!');
});
/* end DB */
