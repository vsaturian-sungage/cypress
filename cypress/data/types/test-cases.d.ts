import { ProjectDetails } from "../../business/types/project-details-types"

export interface TestCases {
    [sectionName: string]: Array<SectionData> 
}  

export interface ExampleCases {
    [sectionName: string]: SectionData 
}

type SectionData = {
    id: number,
    desc?: string,
    projectDetails: ProjectDetails
}