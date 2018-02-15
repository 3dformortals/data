with(LinearAlgebra);
M := Matrix([[0,3^(3/2)/4,2,3^(3/2)/2,pi],[0,1/2,1/sqrt(2),sqrt(3)/2,1],[2,3/2,(2^(3/2)-1)/sqrt(2),(4-sqrt(3))/2,1],[0,27/16,4,27/4,pi^2],[16,27,32,36,4*pi^2]]);
deta := Determinant(M, method = rational);
fsolve(deta,pi);
