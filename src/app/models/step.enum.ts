export type Step = 1 | 10 | 100 | 1000;

export abstract class StepConstants {
  static UNITS: Step = 1;
  static TENS: Step = 10;
  static HUNDREDS: Step = 100;
  static THOUSANDS: Step = 1000;
}
