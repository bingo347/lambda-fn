export type Strong<Input, Base, Default extends Base = never> = Input extends Base ? Input : Default;

