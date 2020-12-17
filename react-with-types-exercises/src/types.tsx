export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
  description?: string;
}

export interface CoursePartOne extends CoursePartBaseWithDescription {
  name: 'Fundamentals';
  // description: string;
}

export interface CoursePartTwo extends CoursePartBaseWithDescription {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBaseWithDescription {
  name: 'Deeper type usage';
  // description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBaseWithDescription {
  name: 'Switches';
  description: string;
  mdnSwitchReference: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
