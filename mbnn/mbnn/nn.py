import numpy as np


def mse(y, y_pred):
    return 1 / 2 * (y - y_pred) ** 2


class OneLayerNN:
    
    def __init__(self):
        self.hidden_n = 10
        self.lr = 0.01
        self.w1 = np.random.randn(self.hidden_n, 2)
        self.w2 = np.random.randn(1, self.hidden_n)

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def sigmoid_derivative(self, z):
        return self.sigmoid(z) * (1 - self.sigmoid(z))

    def tanh(self, z):
        return (np.exp(z) - np.exp(-z)) / (np.exp(z) + np.exp(-z))

    def tanh_derivative(self, z):
        return 1 - self.tanh(z) ** 2

    def forward(self, netin0):
        self.netin0 = netin0
        self.out0 = self.netin0
        self.netin1 = np.dot(self.w1, self.out0)
        self.out1 = self.tanh(self.netin1)
        self.netin2 = np.dot(self.w2, self.out1)
        self.out2 = self.tanh(self.netin2)
        return self.out2

    def backward(self, out2, target):
        self.target = target
        self.out2 = out2

        self.dev2 = self.out2 - self.target
        self.del2 = self.tanh_derivative(self.netin2) * self.dev2
        self.grad2 = np.dot(self.del2, self.out1.T)

        self.dev1 = np.dot(self.w2.T, self.del2)
        self.del1 = self.tanh_derivative(self.netin1) * self.dev1
        self.grad1 = np.dot(self.del1, self.out0.T)

        self.w1 -= self.lr * self.grad1
        self.w2 -= self.lr * self.grad2


class NLayerNN:

    def __init__(self, hidden_size, lr, input_size=2):
        self.hidden_n = hidden_size
        self.lr = lr
        w1 = np.random.randn(self.hidden_n, input_size)  # hidden rows, input columns
        w2 = np.random.randn(
            self.hidden_n, self.hidden_n
        )  # hidden rows, hidden columns
        w3 = np.random.randn(1, self.hidden_n)  # output rows, hidden columns
        self.w = [w1, w2, w3]
        for w in self.w:
            print(w.shape)

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def sigmoid_derivative(self, z):
        return self.sigmoid(z) * (1 - self.sigmoid(z))

    def tanh(self, z):
        return (np.exp(z) - np.exp(-z)) / (np.exp(z) + np.exp(-z))

    def tanh_derivative(self, z):
        return 1 - self.tanh(z) ** 2

    def forward(self, netin0):
        # print(netin0.shape)

        self.netin = []
        self.out = []

        self.netin.append(netin0)
        self.out.append(netin0)

        for i, w in enumerate(self.w):
            self.netin.append(w @ self.out[i])

            # print(f"netin_{i}", w.shape, "@", self.out[i].shape)
            # print(f"netin_{i}", self.netin[i + 1].shape)

            if i == len(self.w) - 1:
                self.out.append(self.netin[i + 1])
            else:
                self.out.append(self.tanh(self.netin[i + 1]))
            # print(f"out_{i}_tanh", self.out[i + 1].shape)

        return self.out[-1]

    def backward(self, out, target):
        self.dev = []
        self.del_ = []
        self.grad = []

        self.dev.append(out - target)
        # print("dev_0", self.dev[0].shape)

        for i, w in enumerate(reversed(self.w)):
            # print("w", w.shape)
            # print("del", self.netin[-(i + 1)].shape, "*", self.dev[i].shape)

            self.del_.append(self.tanh_derivative(self.netin[-(i + 1)]) * self.dev[i])

            # print("del_", self.del_[i].shape)
            # print("grad", self.del_[i].shape, "@", self.out[-(i + 2)].T.shape)
            self.grad.append(self.del_[i] * self.out[-(i + 2)].T)
            # print("grad", self.grad[i].shape)
            # print("dev", w.T.shape, "@", self.del_[i].shape)
            self.dev.append(w.T @ self.del_[i])
            # print("dev", self.dev[i + 1].shape)

        self.w = list(
            reversed(
                [w - self.lr * grad for w, grad in zip(reversed(self.w), self.grad)]
            )
        )
