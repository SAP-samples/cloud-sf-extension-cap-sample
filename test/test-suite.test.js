const tests = require('./test-suite')
var config = require('./config')
jest.setTimeout(30000)

describe('access tokens', () => {
    test('get access token for xsuaa', async () => {
        console.log('TEST 1 : Get access token for XSUAA')
        const result = await tests.getAuthTokenXSUAA()
        console.log('EXPECTED RESULT : XSUAA Access Token')
        if(result.error){
            console.error('ACTUAL RESULT: Issue :',result.error)
        }
        else if(result.access_token){
            console.log('ACTUAL RESULT: XSUAA Access Token')
        }
        else{
            console.error('ACTUAL RESULT : Error :',result)
        }
        expect(result).toMatchObject({
            "access_token": expect.any(String),
            "token_type": "bearer",
            "id_token": expect.any(String),
            "refresh_token": expect.any(String),
            "expires_in": expect.any(Number),
            "scope": "openid uaa.user",
            "jti": expect.any(String)
        })
    })

    test('get access token for em', () => {
        console.log('TEST 2 : Get access token for EM')
        return tests.getAuthTokenEM()
        .then(result => {
            console.log('EXPECTED RESULT : EM Access Token')
            if(result.error){
                console.error('ACTUAL RESULT: Issue :',result.error)
            }
            else if(result.access_token){
                console.log('ACTUAL RESULT: EM Access Token')
            }
            else{
                console.error('ACTUAL RESULT : Error :',result)
            }
            expect(result).toMatchObject({
                "access_token": expect.any(String),
                "token_type": "bearer",
                "expires_in": expect.any(Number),
                "scope": "uaa.resource",
                "jti": expect.any(String)
            })
        })
    })
})

describe('get existing data', () => {
    test('get existing projects', () => {
        console.log('TEST 3 : Get existing projects')
        return tests.getProjects()
        .then(result => {
            console.log('EXPECTED RESULT : Projects fetched')
            if(result.error){
                console.error('ACTUAL RESULT: Issue :',result.error)
            }
            else if(result.value && result.value.length){
                console.log('ACTUAL RESULT: Projects fetched')
            }
            else if(result.value && !result.value.length){
                console.error('ACTUAL RESULT: Projects not found')
            }
            else{
                console.error('ACTUAL RESULT : Error :',result)
            }
            expect(result).toMatchObject({
                value: expect.arrayContaining([
                    expect.objectContaining({
                        ID: expect.any(String),
                        projectName: expect.any(String),
                        description: expect.any(String),
                        criticality: expect.any(String)
                    })
                ])
            })
        })
    })
})

describe('check notification process', () => {
    test('send new notification', async () => {
        console.log('TEST 4 : Send new notification')
        var response = await tests.sendNotification()
        console.log('RESPONSE STATUS:', response.status)
        console.log('EXPECTED RESULT : Notification sent')
        if(response.ok){
            console.log('ACTUAL RESULT: Notification sent')
        }
        else if(response.__proto__.hasOwnProperty('json')){
            console.error('ACTUAL RESULT: Unable to send notification')
        }
        else{
            console.error('ACTUAL RESULT : Error :',response)
        }
        expect(response.ok).toBeTruthy();
    })

    test('get new notification', () => {
        console.log('TEST 5 : Get new notification')
        return tests.getNotification()
        .then(result => {
            console.log('EXPECTED RESULT : Notification fetched')
            if(result.error){
                console.error('ACTUAL RESULT: Issue :',result.error)
            }
            else if(result.value && result.value.length){
                console.log('ACTUAL RESULT: Notification fetched')
            }
            else if(result.value && !result.value.length){
                console.error('ACTUAL RESULT: Notification not found')
            }
            else{
                console.error('ACTUAL RESULT : Error :',result)
            }
            expect(result).toMatchObject({
                value: expect.arrayContaining([
                    expect.objectContaining({
                        ID: expect.any(String),
                        employeeId: '106020',
                        skills: expect.any(String),
                        createdAt: expect.any(String)
                      //  userpic_employeeid: expect.any(String),
                      //  userinfo_employeename: expect.any(String),
                    })
                ])
            })
        })
    })

    test('delete new notification', async () => {
        console.log('TEST 6 : Delete new notification')
        var response = await tests.deleteNotification()
        console.log('RESPONSE STATUS:', response.status)
        console.log('EXPECTED RESULT : Notification deleted')
        if(response.ok){
            console.log('ACTUAL RESULT: Notification deleted')
        }
        else if(response.__proto__.hasOwnProperty('json')){
            var result = await response.json()
            console.error('ACTUAL RESULT: Issue :',result.error)
        }
        else{
            console.error('ACTUAL RESULT : Error :',response)
        }
        expect(response.ok).toBeTruthy();
    })
})
