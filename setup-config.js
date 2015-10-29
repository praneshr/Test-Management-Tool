module.exports ={
  host: 'http://tacamato.herokuapp.com',
  port: '8080',

  getTags: '/testmanagement/tags',
  getAnalytics: '/testmanagement/analytics',
  createTestCase: '/testmanagement/testcase/create',
  testCaseList: '/testmanagement',
  testCaseDetails: '/testmanagement/testcase/view?testID=',
  updateTestCase: '/testmanagement/testcase/update'
}
