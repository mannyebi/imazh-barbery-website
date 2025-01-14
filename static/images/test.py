import convert_numbers

a = "۵۱۲۳۹۶۰۴۴"
b = "512396044"

aI = convert_numbers.persian_to_english(a)
bI = convert_numbers.persian_to_english(b)

if aI == bI:
    print("True") 
else:
    print("False") 