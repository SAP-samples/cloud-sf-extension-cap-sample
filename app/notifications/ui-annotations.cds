using AdminService as admin from '../../srv/admin-service';

annotate AdminService.Notifications with {
  message
  @Common.Label    : '{i18n>message}';
  employeeId
  @Common.Label    : '{i18n>employeeId}';
  managerId
  @Common.Label    : '{i18n>managerId}'
  @UI.HiddenFilter : true
  @odata.contained : true
  @UI.Hidden       : true;
  skills
  @Common.Label    : '{i18n>skills}'
  @UI.MultiLineText;
  createdAt
  @Common.Label    : '{i18n>createdAt}'
 // @UI.MultiLineText : true
  @UI.HiddenFilter : true
  @odata.contained : true;
}

annotate AdminService.Userphoto with {
   photo
   @Core.MediaType : 'image/png'
   @Core.Computed;
}

annotate AdminService.Notifications with @(UI : {
  UpdateHidden : true,
  PresentationVariant : {
    Text           : 'Default',
    SortOrder      : [{
      Property   : createdAt,
      Descending : true
    }],
    Visualizations : ['@UI.LineItem']
  },
  LineItem        : [
  {
    Label : '{i18n>photo}',
    Value : userpic.photo
  },
  {
    Label : '{i18n>employeeId}',
    Value : employeeId
  },
  {
    Label : '{i18n>empname}',
    Target : 'userinfo/@Communication.Contact',
    $Type  : 'UI.DataFieldForAnnotation',
  },
  {
    Label : '{i18n>createdAt}',
    Value : createdAt
    
  },
  {
    Label : '{i18n>message}',
    Value : message
  },
  {
    Label : '{i18n>skills}',
    Value : skills
  }
  ],
  HeaderInfo      : {
    TypeName       : 'Employee',
    TypeNamePlural : 'Employees',
    ImageUrl : userpic.photo,
    Title          : {
      Label : '{i18n>employeeId}',
      Value : employeeId,
      $Type : 'UI.DataField',
    },
    Description    : {
      Value : 'sdsdsd',
      Label : '{i18n>empname}',
      $Type : 'UI.DataField',
    }
  },
  Identification  : [
  {
    Label : '{i18n>employeeId}',
    Value : employeeId
  },
  {
    Label : '{i18n>empname}',
    Target : 'userinfo/@Communication.Contact',
    $Type  : 'UI.DataFieldForAnnotation',
  },
  {
    Label : '{i18n>message}',
    Value : message
  }
  ],
  Facets          : [
  {
    $Type  : 'UI.CollectionFacet',
    Label  : '{i18n>listofprojects}',

    Facets : [{
      $Type               : 'UI.CollectionFacet',
      Label               : '{i18n>empdetails}',
      Facets              : [{
        $Type               : 'UI.ReferenceFacet',
        Target              : '@UI.Identification'
      }]
    }]

  },
  {
    $Type               : 'UI.ReferenceFacet',
    Label               : '{i18n>project}',
    Target              : 'empn/@UI.LineItem#details'
  },
  ]
});

annotate AdminService.Mappings with @(UI : {
  LineItem #details    : [
  {
    Value : project.projectName,
    Label : '{i18n>projectName}'
  },
  {
    Value : project.description,
    Label : '{i18n>description}'
  },
  {
    Value       : project.status.StatusI,
    Label       : '{i18n>projectstatus}',
    Criticality : project.status.crticality
  }
  ]
});
