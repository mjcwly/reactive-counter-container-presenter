import { TickDirection } from "./tick-direction.enum";
import { TickSpeed } from "./tick-speed.enum";

/**
 * An interface that defines the structure of the tick settings object.
 */
export interface ITickSettings {
  /**
   * A boolean value of whether the counter is ticking or not.
   */
  isTicking: boolean;

  /**
   * The tick speed value (100, 500 or 1000 milliseconds).
   */
  tickSpeed: TickSpeed;

  /**
   * The tick direction (up or down).
   */
  tickDirection: TickDirection
}
