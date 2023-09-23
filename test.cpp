#include <iostream>
#include <cmath>

double f(double x) {
    return pow(x, 2) + x - 6;
}

double df(double x) {
    return 2 * x + 1;
}

double newton_raphson(double (*f)(double), double (*df)(double), double x0=2, double epsilon=0.0001, int max_iter=100) {
    double xn = x0;
    for (int i = 1; i <= max_iter; ++i) {
        double fxn = f(xn);
        double dfxn = df(xn);
        std::cout << "At iteration " << i << ", x = " << xn << " and its derivative is " << dfxn << std::endl;
        if (abs(fxn) < epsilon) {
            std::cout << "Converged in " << i << " iterations." << std::endl;
            return xn;
        }
        if (dfxn == 0) {
            std::cout << "Zero derivative. No solution found." << std::endl;
            return NAN;
        }
        xn = xn - fxn/dfxn;
    }
    std::cout << "Exceeded maximum iterations. No solution found." << std::endl;
    return NAN;
}

int main() {
    double initial_guess = 1;
    std::cout << newton_raphson(f, df, initial_guess) << std::endl;

    return 0;
}
