namespace RayTracerEllipsoid
{
    public class Ellipsoid : Geometry
    {
        private Vector Center { get; }
        private Vector SemiAxesLength { get; }
        private double Radius { get; }

        public Vector GetCenter()
        {
            return Center;
        }
        
        
        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Material material, Color color) : base(material, color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            Radius = radius;
        }

        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Color color) : base(color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            Radius = radius;
        }

        public override Intersection GetIntersection(Line line, double minDist, double maxDist)
        {
            // Ellipsoid equation: (x^2 / (a^2)) + (y^2 / (b^2)) + (z^2 / (c^2)) = 1
            // Ray equation: P(t) = X0 + t * Dx, where X0 is the ray origin, Dx is the direction vector, and t is the parameter.

            Vector X0 = line.X0;
            Vector Dx = line.Dx;

            // Ellipsoid parameters
            double a = SemiAxesLength.X;
            double b = SemiAxesLength.Y;
            double c = SemiAxesLength.Z;

            // Translate the ray by the negative of the ellipsoid center
            X0 = X0 - Center;

            // Calculate coefficients of the quadratic equation
            double A = (Dx.X * Dx.X) / (a * a) + (Dx.Y * Dx.Y) / (b * b) + (Dx.Z * Dx.Z) / (c * c);
            double B = 2.0 * ((X0.X * Dx.X) / (a * a) + (X0.Y * Dx.Y) / (b * b) + (X0.Z * Dx.Z) / (c * c));
            double C = (X0.X * X0.X) / (a * a) + (X0.Y * X0.Y) / (b * b) + (X0.Z * X0.Z) / (c * c) - Radius*Radius;

            // Use the quadratic formula to find intersection points
            double discriminant = B * B - 4 * A * C;

            if (discriminant < 0)
            {
                // No real intersection points
                return new Intersection();
            }

            // Calculate intersection parameter values
            double t1 = (-B - Math.Sqrt(discriminant)) / (2 * A);
            double t2 = (-B + Math.Sqrt(discriminant)) / (2 * A);

            // Check if the intersection points are within the specified range
            if (t1 >= minDist && t1 <= maxDist)
            {
                Vector intersectionPoint = line.CoordinateToPosition(t1);
                Vector normal = new Vector(
                    2 * intersectionPoint.X / (a * a),
                    2 * intersectionPoint.Y / (b * b),
                    2 * intersectionPoint.Z / (c * c)
                ).Normalize();
                return new Intersection(true, true, this, line, t1, normal);
            }
            else if (t2 >= minDist && t2 <= maxDist)
            {
                Vector intersectionPoint = line.CoordinateToPosition(t2);
                Vector normal = new Vector(
                    2 * intersectionPoint.X / (a * a),
                    2 * intersectionPoint.Y / (b * b),
                    2 * intersectionPoint.Z / (c * c)
                ).Normalize();
                return new Intersection(true, true, this, line, t2, normal);
            }

            return new Intersection();
        }

    }
}
