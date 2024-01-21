% Nickel powders are used in coatings used to shield electronic equipment. A random sample
% is selected, and the sizes of nickel particles in each coating are recorded (they are assumed
% to be approximately normally distributed)

% a) Find a 95% significance interval for the average size of nickel particles

confidence = input('Confidence level: ');
alpha = 1 - confidence;

m1 = mean(x) - std(x) / sqrt(length(x)) * tinv(1 - alpha / 2, length(x) - 1);
m2 = mean(x) + std(x) / sqrt(length(x)) * tinv(1 - alpha / 2, length(x) - 1);

fprintf('Confidence interval: (%.2f, %.2f)', m1, m2);