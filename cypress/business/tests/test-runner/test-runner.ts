import { ProjectBuilderChecks } from "../installer-portal/installer-portal-checks";
import { ProjectDetails } from "../../types/project-details-types";


class TestRunner {

    static runProjectOverviewTests (projectDetails: ProjectDetails) {
        ProjectBuilderChecks.Positive.checkEmailText(projectDetails.PII);
        ProjectBuilderChecks.Positive.checkFullNameText(projectDetails.PII);
        ProjectBuilderChecks.Positive.checkAddress(projectDetails.PII);
        ProjectBuilderChecks.Positive.checkSungageId();
        if (projectDetails.projectData) {
            ProjectBuilderChecks.Positive.checkProjectDetailsData(projectDetails.projectData);
        }
        if (projectDetails.loanData) {
            ProjectBuilderChecks.Positive.checkLoanData(projectDetails);
        }  
    }

}

export default TestRunner;