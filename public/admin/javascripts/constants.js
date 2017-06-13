var baseUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
//var baseUrl = "http://localhost:6020";

var webservices = {	

	//Authenticate
	"authenticate" 			: baseUrl + "/api/adminLogin",
	"forgotPassword" 		: baseUrl + "/api/forgotPassword",

	//Services
	"getServiceList" 		: baseUrl + "/api/getServiceList",
	"getServiceById" 		: baseUrl + "/api/getServiceById/:id",
	"addService" 			: baseUrl + "/api/addService",
	"changeServiceStatus" 	: baseUrl + "/api/changeServiceStatus",
	"updateServicePic" 		: baseUrl + "/api/updateServicePic",
	"updateService" 		: baseUrl + "/api/updateService",
	"deleteServiceById" 	: baseUrl + "/api/deleteServiceById/:id",
	"deleteImageById" 		: baseUrl + "/api/deleteImageById/:serviceId/:imageId",


	//Units
	"getUnitList" 		: baseUrl + "/api/getUnitList",
	"getUnitById" 		: baseUrl + "/api/getUnitById/:id",
	"addUnit" 			: baseUrl + "/api/addUnit",
	"changeUnitStatus" 	: baseUrl + "/api/changeUnitStatus",
	"updateUnit" 		: baseUrl + "/api/updateUnit",
	"deleteUnitById" 	: baseUrl + "/api/deleteUnitById/:id",
	
	// RawMaterial
	"getRawMaterialList" 		: baseUrl + "/api/getRawMaterialList",
	"getRawMaterialById" 		: baseUrl + "/api/getRawMaterialById/:id",
	"addRawMaterial" 			: baseUrl + "/api/addRawMaterial",
	"changeRawMaterialStatus" 	: baseUrl + "/api/changeRawMaterialStatus",
	"updateRawMaterial" 		: baseUrl + "/api/updateRawMaterial",
	"deleteRawMaterialById" 	: baseUrl + "/api/deleteRawMaterialById/:id"
}

var statusCode = {
    "ok": 200,
    "error": 401,
    "failed": 1002, 
    "unauth": 1003,
    "internalError": 1004
}


var googleConstants = {
	"google_client_id" : "54372597586-09u72notkj8g82vl3jt77h7cbutvr7ep.apps.googleusercontent.com",
}

var appConstants = {
	"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="	
}


var headerConstants = {
	"json": "application/json"
}

var pagingConstants = {
	"defaultPageSize": 10,
	"defaultPageNumber":1
}

var messagesConstants = {
	//users
	"saveUser" : "User saved successfully",
	"updateUser" : "User updated successfully",
	"updateStatus" : "Status updated successfully",
	"deleteUser": "User(s) deleted successfully",

	//schools
	"saveSchool" : "School saved successfully"
}