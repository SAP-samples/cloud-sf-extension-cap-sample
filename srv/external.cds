using { FoundationPlatformPLT as externalphoto } from './external/FoundationPlatformPLT.csn';
using { PLTUserManagement as external } from './external/PLTUserManagement.csn';
using { ECSkillsManagement as externalskill } from './external/ECSkillsManagement.csn';
extend service external with {
  //Mashup Entity from SuccessFactors User
    @mashup entity Users as projection on external.User {
     key userId as employeeid ,
     key defaultFullName as employeename,
      email,
      firstName,
      title,
      lastName,
      businessPhone,
      country,
      gender,
      jobLevel,
      state,
      location,
      division,
      city,
      jobTitle,
      addressLine1,
      department

  };
    //Enterprsie messaging support for eventing with generic namespace
        event sfemessage {
        message    : String;
        employeeId : String;
        managerId  : String;
        readStatus : Boolean;
    }
}
 //Mashup Entity from SuccessFactors Photo
extend service externalphoto with {
    @mashup entity Userphoto as  projection on externalphoto.Photo {
     key userId as employeeid,
    key photoType as phototype,
      photo as photo,
  };

}

@cds.autoexpose
entity sap.sfextension.refapp.Users as projection on external.Users;

@cds.autoexpose 
entity sap.sfextension.refapp.Userphoto as projection on externalphoto.Userphoto;
using { sap.sfextension.refapp } from '../db/schema';

 //Extending the entity Mapping with Userinfo and User Photo
extend refapp.EmployeeProjectMapping with {
  userinfo : Association to refapp.Users;
  userpic : Association to refapp.Userphoto;
}
 //Extending the entity Notifications with Userinfo and User Photo
extend refapp.Notifications with {
  userinfo : Association to refapp.Users;
  userpic : Association to refapp.Userphoto;

}