var baseUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
//var baseUrl = "http://localhost:6020";

var webservices = {	

	"authenticate" : baseUrl + "/api/adminLogin",
	"forgot_password" : baseUrl + "/api/forgotPassword",
	"listVehicleTypes" : baseUrl + "/vehicletypes/list",
	"addVehicleType": baseUrl + "/vehicletypes/add",
	"editVehicleType": baseUrl + "/vehicletypes/edit",
	"updateVehicleType": baseUrl + "/vehicletypes/update",
	"statusUpdateVehicleType": baseUrl + "/vehicletypes/update_status",
	"deleteVehicleType": baseUrl + "/vehicletypes/delete",


	//user
	"addUser" : baseUrl + "/users/add",
	"userList" : baseUrl + "/users/list",
	"findOneUser" : baseUrl + "/users/userOne",
	"bulkUpdateUser" : baseUrl + "/users/bulkUpdate",
	"update" : baseUrl + "/users/update",

	//School
	"addSchool" : baseUrl + "/schools/add",
	"schoolList" : baseUrl + "/api/getInstituteList",
	"findOneSchool" : baseUrl + "/schools/schoolOne",
	"bulkUpdateSchool" : baseUrl + "/schools/bulkUpdate",
	"update" : baseUrl + "/schools/update",
	
	//vehicle webservice listing
	"listVehicles": baseUrl + "/vehicles/list",


	//category
	"allQuestions" : baseUrl + "/categories/allQuestions",
	"categoryList" : baseUrl + "/categories/list",
	"addCategory" : baseUrl + "/categories/add",
	"updateCategory" : baseUrl + "/categories/update",
	"bulkUpdateCategory" : baseUrl + "/categories/bulkUpdate",
	"findOne" : baseUrl + "/categories/findOne",

	//questionnaire webservice listing
	// "questionnaireList" : baseUrl + "/questionnaire/listquestionnaire",
	// "addquestionnaire" : baseUrl + "/questionnaire/addquestionnaire",
	// "editquestionnaire" : baseUrl + "/questionnaire/editquestionnaire",
	// "updatequestionnaire" : baseUrl + "/questionnaire/updatequestionnaire",
	// "deletequestionnaire" : baseUrl + "/questionnaire/removequestionnaire",
	// "updatestatusquestionnaire" : baseUrl + "/questionnaire/updateStatus",

	"questionnaireList" : baseUrl + "/questionnaire/list",
	"addquestionnaire" : baseUrl + "/questionnaire/add",
	"findOneQuestionnaire" : baseUrl + "/questionnaire/questionnaireOne",
	"bulkUpdateQuestionnaire" : baseUrl + "/questionnaire/bulkUpdate",
	"updateQuestionnaire" : baseUrl + "/questionnaire/update",
	

	//question webservice listing
	"updateQuestion" : baseUrl + "/questions/update",
	"findOneQuestion" : baseUrl + "/questions/question",
	"addQuestion" : baseUrl + "/questions/add",
	"bulkUpdateQuestion" : baseUrl + "/questions/bulkUpdate",
	"getAnswerList" : baseUrl + "/questions/getanswerlist",


	//answertype webservice listing
	"answerTypeList" : baseUrl + "/answer_type/list",
  
  //role
	"roleList" : baseUrl + "/roles/list",
	"addRole" : baseUrl + "/roles/add",
	"updateRole" : baseUrl + "/roles/update",
	"findOneRole" : baseUrl + "/roles/role",
	"bulkUpdateRole" : baseUrl + "/roles/bulkUpdate",

	//permission
	"permissionList" : baseUrl + "/permissions/list",
	"createPermission" : baseUrl + "/permissions/create",
	"updatePermission" : baseUrl + "/permissions/update",
	"findOnePermission" : baseUrl + "/permissions/permission",
	"bulkUpdatePermission" : baseUrl + "/permissions/bulkUpdate",



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