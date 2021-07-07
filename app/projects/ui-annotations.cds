using AdminService from '../../srv/admin-service';

annotate AdminService.Project with {
    ID
    @UI.Hidden           : true
    @Common.Label        : '{i18n>ID}';
    projectName
    @Common.Label        : '{i18n>projectName}'
    @Common.FieldControl : #Mandatory
    @assert.mandatory: false;
    description
    @UI.MultiLineText
    @Common.Label        : '{i18n>description}'
     @Common.FieldControl : #Mandatory
     @assert.mandatory: false;
    criticality
    @Common.FieldControl : #Mandatory;
}

annotate AdminService.Mappings with {
    project_ID
    @Common.Label        : '{i18n>ID}';
    employeeId
    @(Common : {
        Label        : '{i18n>employeeId}',
        FieldControl             : identifierFieldControl,
        ValueListWithFixedValues : true,
        ValueList                : {
            CollectionPath : 'Users',
            Label          : 'Users',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterOut',
                LocalDataProperty : 'employeeId',
                ValueListProperty : 'employeeid',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'employeename',
            },
            ]
        },
    });
    userinfo_employeeid
    @Common.Label        : '{i18n>employeeId}';
}

annotate AdminService.Users with {
    employeeid
    @Common.Label        : '{i18n>employeeId}';
    employeename
    @Common.Label        : '{i18n>empname}';
}

annotate AdminService.Users with @(Communication.Contact : {
    fn     : employeename,
    nickname : employeeid,
    n      : {
        surname : lastName,
        given   : firstName
    },
    //photo : userpic.photo,
    title  : jobTitle,
    org : division,
    gender : [{
        type: gender}],
    kind   : #individual,
    tel    : [{
        uri  : businessPhone,
        type : #work
    }],
    email  : [{
        address : email,
        type    : #work
    }],
    adr    : [{
        street : addressLine1,
        district : state,
        locality : country,
        region : city,
        label    : address,
        type     : #home
    }],
});
annotate AdminService.Project with @(UI : {
    LineItem          : [
    {
        Value : projectName,
         $Type : 'UI.DataField',
        Label : '{i18n>projectName}'
    },
    {
        Value : description,
         $Type : 'UI.DataField',
        Label : '{i18n>description}'
    },
    {
        Value       : status.StatusI,
        Label       : '{i18n>projectstatus}',
        Criticality : status.crticality
    },
    {
        $Type              : 'UI.DataFieldForAction',
        Label              : 'Change Project Status',
        Action             : 'AdminService.ChangeStatus',
        InvocationGrouping : #Isolated
    },
    ],

    HeaderInfo        : {
        TypeName       : 'Project',
        TypeNamePlural : 'Projects',
        Title          : {
             $Type : 'UI.DataField',
            Label : '{i18n>projectName}',
            Value : projectName
        },
        Description    : {
             $Type : 'UI.DataField',
            Value : description,
            Label : '{i18n>description}'
        }
    },
    Identification    : [
    {
        Value : projectName,
        Label : '{i18n>projectName}'
    },
    {
        Value : description,
        Label : '{i18n>description}'
    }
    ],
    DataPoint #status : {
        Value       : status.StatusI,
        Title       : '{i18n>projectstatus}',
        Criticality : status.crticality
    },
    HeaderFacets      : [{
        $Type  : 'UI.ReferenceFacet',
        Target : '@UI.DataPoint#status'
    }],
    Facets            : [
    {
        $Type               : 'UI.ReferenceFacet',
        Label               : '{i18n>projects}',
        Target              : '@UI.Identification'
    },
    {
        $Type                : 'UI.ReferenceFacet',
        Label                : '{i18n>listofemp}',
        Target               : 'employees/@UI.LineItem'
    }
    ]
});

annotate AdminService.Mappings with @(UI : {
    LineItem            : [
          {
    Label : '{i18n>photo}',
    $Type : 'UI.DataField',
    Value : userpic.photo
  },
    {
        Value : employeeId,
         $Type : 'UI.DataField',
        Label : '{i18n>employeeId}'
    },
    {
        //Value : userinfo.employeename,
        Label : '{i18n>empname}',
        Target : 'userinfo/@Communication.Contact',
        $Type  : 'UI.DataFieldForAnnotation',
    }
    ]
});
