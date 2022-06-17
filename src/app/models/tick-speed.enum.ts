export type TickSpeed = 100 | 500 | 1000;

export abstract class TickSpeedConstants {
  static FAST: TickSpeed = 100;
  static MEDIUM: TickSpeed = 500;
  static SLOW: TickSpeed = 1000;
}
