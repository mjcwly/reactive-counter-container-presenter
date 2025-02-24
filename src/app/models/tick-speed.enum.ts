/**
 * A type to restrict the tick speed values to 100, 500, or 1000 (milliseconds).
 */
export type TickSpeed = 100 | 500 | 1000;

/**
 * A class that contains constants for the tick speed values.
 */
export abstract class TickSpeedConstants {
  static FAST: TickSpeed = 100;
  static MEDIUM: TickSpeed = 500;
  static SLOW: TickSpeed = 1000;
}
