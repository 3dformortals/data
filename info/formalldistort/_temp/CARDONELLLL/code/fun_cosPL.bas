Attribute VB_Name = "function_cosPL"
function cosPL(AP,BP,CP,AL,BL,CL)

cosPL =cos(90-acos((AP*AL + BP*BL + CP*CL)/((AP^2 + BP^2 + CP^2)^0.5*(AL^2 + BL^2 + CL^2)^0.5)))

end function

REM AP,BP,CP -нормаль к плоскости (вектор)
REM AL,BL,CL -составляющие направляющего вектора прямой
