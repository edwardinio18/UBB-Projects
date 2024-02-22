namespace RayTracerEllipsoid
{
    class RayTracer
    {
        private Geometry[] geometries;
        private Light[] lights;

        public RayTracer(Geometry[] geometries, Light[] lights)
        {
            this.geometries = geometries;
            this.lights = lights;
        }

        private double ImageToViewPlane(int n, int imgSize, double viewPlaneSize)
        {
            return -n * viewPlaneSize / imgSize + viewPlaneSize / 2;
        }

        private Intersection FindFirstIntersection(Line ray, double minDist, double maxDist)
        {
            var intersection = new Intersection();

            foreach (var geometry in geometries)
            {
                var intr = geometry.GetIntersection(ray, minDist, maxDist);

                if (!intr.Valid || !intr.Visible) continue;

                if (!intersection.Valid || !intersection.Visible)
                {
                    intersection = intr;
                }
                else if (intr.T < intersection.T)
                {
                    intersection = intr;
                }
            }

            return intersection;
        }

        private bool IsLit(Vector point, Light light)
        {
            // Create a ray from the light source to the given point in the scene.
            Line ray = new Line(light.Position, point);

            // Find the first intersection of the ray with objects in the scene within a specific range.
            var intersection = FindFirstIntersection(ray, 0.0, (light.Position - point).Length());

            // Return true if the point is lit (i.e., there are no obstructions between the point and the light source).
            return intersection.Valid;
        }

        public void Render(Camera camera, int width, int height, string filename)
        {
            var image = new Image(width, height);

            for (var i = 0; i < width; i++)
            {
                for (var j = 0; j < height; j++)
                {
                    // Define the starting point of the viewing ray (from the camera's position).
                    var rayStartPoint = camera.Position;

                    // Calculate the endpoint of the viewing ray (rayEndPoint) for the current pixel.
                    var rayEndPoint = camera.Position +
                        camera.Direction * camera.ViewPlaneDistance +
                        (camera.Up ^ camera.Direction) * ImageToViewPlane(i, width, camera.ViewPlaneWidth) +
                        camera.Up * ImageToViewPlane(j, height, camera.ViewPlaneHeight);

                    // Find the first intersection of the ray with objects in the scene within a specific range.
                    var intersection = FindFirstIntersection(new Line(rayStartPoint, rayEndPoint), camera.FrontPlaneDistance, camera.BackPlaneDistance);

                    if (intersection.Geometry == null)
                    {
                        // If no intersection is found, set the pixel's color to black.
                        image.SetPixel(i, j, new Color());
                    }
                    else
                    {
                        // Initialize a color variable for the pixel.
                        Color color = new Color();

                        // Get the material properties of the intersected object.
                        Material material = intersection.Geometry.Material;

                        foreach (var light in lights)
                        {
                            // Initialize the color contributed by the ambient light.
                            var lightColor = material.Ambient * light.Ambient;

                            if (IsLit(intersection.Position, light))
                            {
                                // Calculate the normal vector at the point of intersection.
                                var normalVector = (intersection.Position - ((Ellipsoid)intersection.Geometry).GetCenter()).Normalize();

                                // Calculate the direction of the light ray.
                                var lightRayDirection = (light.Position - intersection.Position).Normalize();

                                // Calculate the dot product between the normal vector and the light ray direction.
                                // Ensure it's positive to account for light coming from the correct direction.
                                var nDotL = (normalVector * lightRayDirection);

                                if (nDotL > 0)
                                {
                                    // Add diffuse reflection to the light color.
                                    lightColor += material.Diffuse * light.Diffuse * nDotL;

                                    // Calculate the direction of the eye ray (from camera to intersection point).
                                    var eyeRayDirection = (camera.Position - intersection.Position).Normalize();

                                    // Calculate the reflected ray direction.
                                    var reflectedRayDirection = normalVector * (2 * nDotL) - lightRayDirection;

                                    // Calculate the dot product between the eye ray and the reflected ray direction.
                                    // Ensure it's positive to account for reflection towards the camera.
                                    var eDotR = (eyeRayDirection * reflectedRayDirection);

                                    if (eDotR > 0)
                                    {
                                        // Add specular reflection to the light color.
                                        lightColor += material.Specular * light.Specular * Math.Pow(eDotR, material.Shininess);
                                    }

                                    // Scale the light color by the intensity of the light source.
                                    lightColor *= light.Intensity;
                                }

                                // Accumulate the lightColor contribution to the pixel's color.
                                color += lightColor;
                            }
                        }

                        // Set the pixel's color to the final calculated color.
                        image.SetPixel(i, j, color);
                    }
                }
            }

            image.Store(filename);
        }
    }
}