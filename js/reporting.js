'use strict';

const ReportingForm = {
  handleReportingIssueChoice: function(element) {
    // Show additional form elements if the answer is "yes"
    if (element.value === 'Yes') {
      document.querySelector('#additionalWebcompatInfo').classList.remove('hidden');
    } else {
      document.querySelector('#additionalWebcompatInfo').classList.add('hidden');
    }
  },

  submit: function() {
    var form = document.querySelector('#reporting-form');
    var baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdvYUo_iay2hRYK0kCBt5WLQmOYukPcLL3kYPZZqzds_--hcg/formResponse?';
    var submitRef = '&submit=Submit';

    var nicknameValue = document.querySelector('#nicknameInput').value;
    var nicknameEntry = 'entry.888970648';
    var websiteValue = document.querySelector('#urlInput').value;
    var websiteEntry = 'entry.1154902921';
    var issueFoundValue = document.querySelector('#issueFoundChoice input:checked').value;
    var issueFoundEntry = 'entry.1508250963';
    var webcompatIssueValue = document.querySelector('#issueWebcompatInput').value;
    var webcompatIssueEntry = 'entry.908686419';

    if (!websiteValue || !issueFoundValue ||
        (issueFoundValue === 'Yes' && !webcompatIssueValue)) {
      document.querySelector('.form-error').classList.remove('hidden');
      return false;
    }

    var submitURL = baseURL +
        nicknameEntry + "=" + nicknameValue + "&" +
        websiteEntry + "=" + websiteValue + "&" +
        issueFoundEntry + "=" + issueFoundValue + "&" +
        webcompatIssueEntry + "=" + webcompatIssueValue +
        submitRef;

    form.action = submitURL;

    document.querySelector('#reporting-form').classList.add('hidden');
    document.querySelector('.afterSubmitInfo').classList.remove('hidden');
  }
}

document.querySelector('#reporting-form').addEventListener('submit', ReportingForm.submit);
