const cds = require('@sap/cds')
const { Readable } = require('stream')
module.exports = async srv => {
  const usermanage = await cds.connect.to('PLTUserManagement'),
    photomanage = await cds.connect.to('FoundationPlatformPLT'),
    skillsmanage = await cds.connect.to('ECSkillsManagement'),
    { Mappings, Notifications, Project } = srv.entities,
    { Users: userInfo } = usermanage.entities,
    { Userphoto: userPic } = photomanage.entities

  const STATUS = {
    Open: "O",
    Completed: "C",
    INProcess: "I",
  }

  //* External Read on User Info *//
  srv.on('READ', 'Users', async (req) => {
    if (!req.user) return;
    const empId = req.user.id;
    if (req.params.length === 2) {
      const mappingid = req.params[1].ID;
      const userid = await cds.run(SELECT.one.from(Mappings).where({ ID: mappingid }).columns('employeeId')),
        empIduser = userid.employeeId,
        queryad = SELECT.from(userInfo).where({ employeeid: empIduser }),
        employeedetails = await usermanage.tx(req).run(queryad);
      return employeedetails[0]
    } else  if (req.params.length === 1){
      const notificationid = req.params[0].ID,
        userid = await cds.run(SELECT.one.from(Notifications).where({ ID: notificationid }).columns('employeeId')),
        empIduser = userid.employeeId,
        queryad = SELECT.from(userInfo).where({ employeeid: empIduser }),
        employeedetails = await usermanage.tx(req).run(queryad);
      return employeedetails[0]
    } else {
      const tx = usermanage.transaction(req)
      const response = await tx.get(`/User('${empId}')/directReports?$format=json`)
     return response.map(row => ({ employeeid: row.userId, employeename: row.defaultFullName }))
    }
  })

  //* External Read on User Photo Details *//
  srv.on('READ', 'Userphoto', async  req => {
    if (!req.user) return;
    const mappingid = req.params
    if (req.params.length === 2) { 
      const mappingidpic = req.params[1].ID,
       userid = await cds.run(SELECT.one.from(Mappings).where({ ID: mappingidpic }).columns('employeeId')),
        empId = userid.employeeId,
        queryad = SELECT.from(userPic).where({ employeeid: empId, phototype: 20 }),
        userphoto = await photomanage.tx(req).run(queryad);
      //*  This is primitive logic to stream in case of sqlite *//
      const userPhotonm = userphoto[0].photo
      let imagebuff = new Buffer.from(userPhotonm, 'base64');
      const streamdata = new Readable()
      streamdata.push(imagebuff)
      streamdata.push(null)
      const obj = { value: streamdata },
        contentType = 'image/png';
      obj['*@odata.mediaContentType'] = contentType
      return obj
    } else  if (req.params.length === 1){
      const notificationpic = req.params[0].ID,
      userid = await cds.run(SELECT.one.from(Notifications).where({ ID: notificationpic }).columns('employeeId')),
        empId = userid.employeeId,
        queryad = SELECT.from(userPic).where({ employeeid: empId, phototype: 20 }),
        userphoto = await photomanage.tx(req).run(queryad);
      //*  This is primitive logic to stream in case of sqlite *//
      const userPhotonm = userphoto[0].photo
      let imagebuff = new Buffer.from(userPhotonm, 'base64');
      const streamdata = new Readable()
      streamdata.push(imagebuff)
      streamdata.push(null)
      const obj = { value: streamdata },
        contentType = 'image/png';
      obj['*@odata.mediaContentType'] = contentType
      return obj
    } else {
      const empId = req.user.id,
        queryad = SELECT.from(userPic).where({ employeeid: empId, phototype: 20 });
      return photomanage.tx(req).run(queryad)

    }
  })

  //* Emnterprise Messaging Configuration *//
  /* For Use Productive use */
  usermanage.on('sfemessage', async msg => {
    const message = msg.headers.message,
      employeeId = msg.headers.employeeId,
      managerId = msg.headers.managerId,
      readStatus = msg.headers.readStatus;
    console.log('msg => emitting', msg)
    return cds.run(
      INSERT.into(Notifications).entries({
        message,
        employeeId,
        managerId,
        readStatus
      })
    )
  })

  //* Project Status Check function *//
  srv.on('ChangeStatus', 'Project', async (req) => {
    if (!req.user) return;
    const user = req.data;
    const tx = cds.transaction(req);
    const projectid = req.params[0].ID;
    //req.query.SELECT.where[2].val;
    const affectedRows = await tx.run(SELECT.one.from(Project).where({ ID: projectid }).columns(['criticality','projectName']));
    if (affectedRows.criticality !== user.criticality) {
      return tx.run(
        UPDATE(Project).set({ criticality: user.criticality }).where({ ID: projectid })

    ).then(() => {
        req.info({
            "code": 201,
            "message": `Project ${affectedRows.projectName} Status Changed Successfully`,
            "numericSeverity": 1
        })
        return { criticality: user.criticality }
    })
    }
    else {
      let criticalitystatus = _computeCriticality(user.criticality)
      return req.reject(
        400,
        `Project ${affectedRows.projectName} is already in ${criticalitystatus} Status, Please Select the Different Status`,
        `criticality`
      )
    }
  })

  //* case statement for criticality display *//
  function _computeCriticality(status) {
    switch (status) {
      case STATUS.Open:
        return "Open";
      case STATUS.Completed:
        return "Completed";
      case STATUS.INProcess:
        return "INProcess";
    }
  }
  //* Updating the Project and Employees Assigned *//
  srv.before(["UPDATE", "CREATE"], async (req) => {
    if (!req.user) return;
    if (!req.data.projectName) {
      return req.reject(
        400,
        "Property 'Project Name' must have a value.",
        "in/projectName"
      );
    }
    if (!req.data.description) {
      return req.reject(
        400,
        "Property 'Project description' must have a value.",
        "in/description"
      );
    }
    if (!req.user) return;
    const empdata = req.data,
      tx = cds.transaction(req),
      projecid = empdata.ID,
      personexist = await tx.run(SELECT.from(Mappings).where({ project_ID: projecid }).columns('employeeId'));
    req.data.employees.forEach(emp => {
      if (emp.employeeId === null) {
        return req.reject(
          400,
          `Please Select the Employee`,
          `in/employees(ID=${emp.ID},IsActiveEntity=false)/employeeId`
        )
      }
      if (emp.userinfo_employeename != null) {
        const userid = emp.employeeId,
          username = emp.userinfo_employeename;
        personexist.forEach(data => {
          if (data.employeeId === userid) {
            return req.reject(
              400,
              `Employee ${username} is already been assigned`,
              `in/employees(ID=${emp.ID},IsActiveEntity=false)/employeeId`
            )
          }
        })
        emp.userinfo_employeeid = null
        emp.userinfo_employeename = null
        req.info({
          "code": 201,
          "message": `Employee ${username} is  been assigned`,
          "numericSeverity": 1
        })
      }
    })
  })
  //* Success After Creating *//
  srv.after("CREATE", "Project", async (req, res) => {
    const project = res.data;
    res.info({
      "code": 201,
      "message": `Project ${project.projectName} is  Created Successfully`,
      "numericSeverity": 1
    })
  })
  //* Success After Updating *//
  srv.after("UPDATE", "Project", async (req, res) => {
    const project = res.data
    res.info({
      "code": 201,
      "message": `Project ${project.projectName} is  Updated Successfully`,
      "numericSeverity": 1
    })

  })

  //* Read Mappings Data using employeeID into employee name*// 
  srv.on('READ', 'Mappings', async (req, next) => {
    const mappings = await next()
    if (!req.user) return;
    const txuser = usermanage.tx(req),
      txphoto = photomanage.tx(req);
    await Promise.all(
      mappings
        .filter(mapping => mapping.employeeId)
        .map(mapping => Promise.all([getEmployeeName(mapping, txuser), getPic(mapping, txphoto)]))
    )
    return mappings;
    });

  //* Read Notifications data from employeeid into skills, employee name *//
  srv.on('READ', 'Notifications', async (req, next) => {
    const notifications = await next()
    if (!req.user) return;
    const txuser = usermanage.tx(req),
      txphoto = photomanage.tx(req),
      txskills = skillsmanage.tx(req);
      await Promise.all(
        notifications
          .filter(notification => notification.employeeId)
          .map(notification =>
            Promise.all([
              getEmployeeName(notification, txuser),
              getSkills(notification, txskills),
              getPic(notification, txphoto)
            ])
          )
      )
    return notifications;
    });

  //* Employee Name Function *//
  const getEmployeeName = async (each, tx) => {
    try {
      const empId = each.employeeId,
        query = SELECT.from(userInfo).where({ employeeid: empId }),
        username = await tx.run(query)
      username.forEach(name => { each.userinfo = name, each.userinfo_employeename = name.employeename, each.userinfo_employeeid = name.employeeid })

    } catch (e) {
      console.log(e)
      each.userinfo_employeename = 'Unknown'
    }
  }
  //* Skills Function *//
  const getSkills = async (each, tx) => {
    try {
      const skillArr = [],
        empId = each.employeeId,
        query = `/SkillProfile('${empId}')?$format=json&$expand=externalCodeNav,ratedSkills/skillNav&$select=ratedSkills/skillNav/name_en_US`,
        data = await tx.run(query),
        skills = data.ratedSkills.results
      for (const skill of skills) {
        const skillName = skill.skillNav.name_en_US
        skillArr.push(skillName)
      }
      each.skills = skillArr.toString()
    } catch (e) {
      each.skills = 'No Skills mapped in SuccessFactors'
      return
    }
  }

  // //* Employee Picture Function *//
  const getPic = async (each, tx) => {
    try {
      const empId = each.employeeId,
        queryn = SELECT.from(userPic)
          .where({ employeeid: empId, phototype: 20 }),
        username = await tx.run(queryn)
      username.forEach(name => {
        each.userpic = name,
          each.userpic_employeeid = name.employeeid, each.userpic_phototype = name.phototype
      })
    } catch (e) {
      console.log(e)
      each.userpic_employeeid = 'Unknown'
    }
  }
}

