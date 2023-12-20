import numpy as np
from sklearn.model_selection import train_test_split

from mbnn.nn import NLayerNN, OneLayerNN, mse

np.random.seed(0)
m = 100
X = np.linspace(0, 10, m).reshape(m, 1)
y = np.sin(X) + np.random.normal(0, 0.2, size=(m, 1))

X_train, X_test, y_train, y_test = train_test_split(X, y)
X_train = (X_train - X_train.mean()) / X_train.std()
y_train = (y_train - y_train.mean()) / y_train.std()


model = NLayerNN(5, 0.01)

errors = []
for epoch in range(2000):
    total_error = []
    for train, target in zip(X_train, y_train):
        train = np.append(train, 1)
        out = model.forward(train)
        model.backward(out, target)
        err = mse(target, out)
        total_error.append(err)
    errors.append(np.mean(total_error))
    if epoch % 1000 == 0:
        print(f"Epoch {epoch} - Error {np.mean(total_error)}")
        # print(model.w1, model.w2)
