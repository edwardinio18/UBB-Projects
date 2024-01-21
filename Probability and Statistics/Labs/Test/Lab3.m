pkg load statistics

#1

alpha = input("alpha = ")
beta = input("beta = ")

option = input("distribution = ", "s")

switch option
  case "normal"
    mu = input("mu = ")
    sigma = input("sigma = ")

    P1 = normcdf(0, mu, sigma)
    P2 = 1 - P1
    P3 = normcdf(1, mu, sigma) - normcdf(-1, mu, sigma)
    P4 = 1 - P3
    P5 = norminv(alpha, mu, sigma)
    P6 = norminv(1 - beta, mu, sigma)
  case "student"
    n = input("n = ")

    P1 = tcdf(0, n)
    P2 = 1 - P1
    P3 = tcdf(0, n) - tcdf(0, n)
    P4 = 1 - P3
    P5 = tinv(alpha, n)
    P6 = tinv(1 - beta, n)

  case 'fischer'
    n = input("n = ")
    m = input("m = ")

    P1 = fcdf(0, n, m)
    P2 = 1 - P1
    P3 = fcdf(0, n, m) - fcdf(0, n, m)
    P4 = 1 - P3
    P5 = finv(alpha, n, m)
    P6 = finv(1-beta, n, m)

  otherwise
    fprintf("Error")

end

#2

p = input("p = ")
for n = 1:3:100
  k = 0:n
  prob = binopdf(k, n, p)
  plot(prob)
  xlim([0, 100])
  ylim([0, 0.15])
  pause(0.05)
end

#3
n = input("n = ") # 30
p = input("p = ") # 0.1

lambda = n * p

k = 0:n

p1 = poisspdf(k, lambda);
p2 = binopdf(k, n, p);
plot(k, p1, k, p2);