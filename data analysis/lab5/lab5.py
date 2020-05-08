import random as rand
from collections import Counter
import matplotlib.pyplot as plt
import math

print(" ")
x = []
m = 6
sigma = 0.4
N = 35000
i = 0
while i < N:
    eps = math.sqrt(12/5) * (sum([rand.uniform(0,1) for i in range(5)]) - 5/2)
    x.append(m + sigma * (0.01 * eps * (97 + eps ** 2)))
    i += 1

print("Математичне сподівання і дисперсія вибірки")
# Математичне сподівання (обчислене) і Дисперсія
Mx = sum(x)/len(x)
Dx = math.sqrt(sum(i*i for i in x)/len(x) - Mx**2)

print(Mx, " -> Mx\t" , Dx, " -> Dx")

print("Обчислення математичного сподівання і дисперсії в залежності від N")
# Обчислення математичного сподівання і дисперсії в залежності від N
i = 100
MX = []
DX = []

while i <= N:
    Mx = sum(x[:i])/len(x[:i])
    MX.append(Mx)
    Dx = math.sqrt(sum(i*i for i in x[:i])/len(x[:i]) - Mx**2)
    DX.append(Dx)
    i += 1


plt.figure()
plt.plot([i for i in range(100,len(MX)+100)],MX)
plt.title("Залежність MX від N")
plt.grid()

plt.figure()
plt.plot([i for i in range(100,len(DX)+100)],DX)
plt.title("Залежність DX від N")
plt.grid()
plt.show()


print(" ")

# Сортування значень випадкових чисел
count_items = Counter(x)
count_items_sort_keys = list(count_items.keys())
count_items_sort_keys.sort()

# Згруповування випадкових чисел у вхідний масив Х
a = []
OX = []
for i in count_items_sort_keys:
    a.append(i)
for i in a:
    OX.extend([i, i])
    
# Згруповування к-сті повторювань відповідних чисел у вхідний масив Y   
b = []
OY = [0,]
for i in count_items_sort_keys:
    b.append(count_items[i])
    
k = 1
c = []
while k <= len(b):
    c.append(sum(b[:k]))
    k += 1
for i in c:
    OY.extend([i, i])
OY.pop()

# Емпіричний графік
plt.figure()
plt.plot(OX,OY)
plt.title("Емпіричний графік")
plt.grid()

print(" ")
print("Створення гістограми для масиву випадкових N чисел")
# Обчислення к-сті груп для гістограми
m = 1 + 3.334 * math.log(N)
# Крок для однієї групи
h = ( max(count_items_sort_keys) - min(count_items_sort_keys) ) / m
d = [min(count_items_sort_keys),]
i = 1
while i <= m:
    d.append(min(count_items_sort_keys) + h * i)
    i += 1

plt.figure()
plt.hist(x,bins = int(m))
plt.title("Гістограма")
plt.show()