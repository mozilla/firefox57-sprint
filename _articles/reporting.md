---
layout: simple
title: "Reporting"
---

<div class="reporting" markdown="1">

# Report your testing progress

<h2>
  <span class="capitalize">T</span>
  <span class="capitalize-content">
    hanks for helping test websites with Firefox Quantum!<br /> 
    Please share your result with us. The data entered below will be stored in a Google Sheet.
  </span>
</h2>

<div class="content-box">
  <form id="reporting-form" action="" method="POST" target="no-target">
    <div class="form-group">
      <label for="nicknameInput">Nickname</label>
      <input type="text" class="form-control" id="nicknameInput" placeholder="Enter your nickname">
      <p id="nickname" class="form-text text-muted">This nickname will show up in several places and is public.</p>
    </div>
    <div class="form-group">
      <label for="urlInput">Which website did you test?</label>
      <input type="url" class="form-control" id="urlInput" placeholder="https://www.mozilla.org">
    </div>
    <fieldset class="form-group" id="issueFoundChoice">
      <label>Did you find an issue with the tested site?</label>
      <div class="form-check">
        <label class="form-check-label">
          <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" onclick="ReportingForm.handleReportingIssueChoice(this);" value="Yes" checked> Yes
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" onclick="ReportingForm.handleReportingIssueChoice(this);" value="No"> No
        </label>
      </div>
    </fieldset>
    <div id="additionalWebcompatInfo" class="form-group">
      <label for="issueWebcompatInput">Please head over to <a href="https://webcompat.com/">webcompat.com</a> and file an issue with your testing result and then enter the submitted report link here.</label>
      <input type="url" class="form-control" id="issueWebcompatInput" placeholder="https://webcompat.com/issues/9999">
    </div>
    <p> Always remember to test in another browser as well before you submit a webcompat issue </p> 
    <p class="form-error hidden">Please check all form fields to make sure everything required is filled out!</p>
    <button type="submit" class="button submit-button">Submit</button>
  </form>

  <div class="afterSubmitInfo hidden">
    <h2>Thanks for submitting your report!</h2>
    <a href="{{ site.baseurl }}/reporting/">Add a new report</a>
  </div>
</div>

</div>

<!-- used as target after form submission so we don't go away from our site -->
<iframe src="#" id="no-target" name="no-target" style="display:none"></iframe>

<script src="{{ site.baseurl }}/js/reporting.js"></script>
