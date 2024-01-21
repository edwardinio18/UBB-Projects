using Lab4.Parser;

namespace Lab4
{
    class Program
    {
        private static readonly List<string> Urls = new()
        {
            "www.example.com",
            "www.microsoft.com",
            "www.google.com",
        };

        static void Main()
        {
            try
            {
                new CallbackSolution(Urls);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            try
            {
                new TaskSolution(Urls);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            try
            {
                new AsyncAwaitSolution(Urls);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}