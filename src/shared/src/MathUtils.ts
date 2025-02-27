export class MathUtils {
   static DEEGREES_TO_RADIANS = Math.PI / 180;

   static Rad2Deg = 180 / Math.PI;

   private static optiPow10 = [];

   public static fastToFixed(val: number, fraction: number): string {
       if (fraction <= 0) {
           return Math.round(val).toString();
       }

       let coefficient = MathUtils.optiPow10[fraction];
       if (!coefficient || Number.isNaN(coefficient)) {
           coefficient = 10 ** fraction;
           MathUtils.optiPow10[fraction] = coefficient;
       }

       return (Math.round(val * coefficient) / coefficient).toString();
   }

   public static diffAngle(a: number, b: number): number {
       let diff = b - a;
       while (diff > 180) {
           diff -= 360;
       }
       while (diff <= -180) {
           diff += 360;
       }
       return diff;
   }

   /**
    * Calculates the inner angle of the small triangle formed by two intersecting lines
    *
    * This effectively returns the angle XYZ in the figure shown below:
    *
    * ```
    * * Y
    * |\
    * | \
    * |  \
    * |   \
    * |    \
    * |     \
    * |      \
    * * X     * Z
    * ```
    *
    * @param xyAngle {number} bearing of line XY
    * @param zyAngle {number} bearing of line ZY
    */
   public static smallCrossingAngle(xyAngle: number, zyAngle: number): number {
       // Rotate frame of reference to 0deg
       let correctedXyBearing = xyAngle - zyAngle;
       if (correctedXyBearing < 0) {
           correctedXyBearing = 360 + correctedXyBearing;
       }

       let xyzAngle = 180 - correctedXyBearing;
       if (xyzAngle < 0) {
           // correctedXyBearing was > 180

           xyzAngle = 360 + xyzAngle;
       }

       return xyzAngle;
   }

   public static mod(x: number, n: number): number {
       return x - Math.floor(x / n) * n;
   }

   public static highestPower2(n: number): number {
       let res = 0;
       for (let i = n; i >= 1; i--) {
           if ((i & (i - 1)) === 0) {
               res = i;
               break;
           }
       }
       return res;
   }

   public static unpackPowers(n: number): number[] {
       const res: number[] = [];

       let x = n;
       while (x > 0) {
           const pow = MathUtils.highestPower2(x);
           res.push(pow);
           x -= pow;
       }

       return res;
   }

   public static packPowers(ns: number[]): number {
       if (ns.some((it) => it === 0 || (it & it - 1) !== 0)) {
           throw new Error('Cannot pack number which is not a power of 2 or is equal to zero.');
       }

       return ns.reduce((acc, v) => acc + v);
   }
}
