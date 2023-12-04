import numpy as np
import plotly.graph_objects as go
import plotly.io as pio


# Sigmoid function
def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def plot_one(xs, ys, y1, y2, important_xs, important_ys, important_points, f1, f2):
    Trace1 = go.Scatter3d(
        x=xs,
        y=ys,
        z=y1,
        mode="markers",
        marker=dict(size=3, color="green", opacity=0.8),
    )
    Trace2 = go.Scatter3d(
        x=xs, y=ys, z=y2, mode="markers", marker=dict(size=3, color="red", opacity=0.8)
    )

    # Adding points (0,0), (1,0), (0,1) and (1,1) at y = 0
    Trace5 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=[0, 0, 0, 0],
        mode="markers",
        marker=dict(size=10, color="black", opacity=0.8),
    )

    # Adding points for sigmoid(f1(x, y)) + sigmoid(f2(x, y))
    sigmoid_points = [sigmoid(f1(p)) + sigmoid(f2(p)) for p in important_points]

    Trace6 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=sigmoid_points,
        mode="markers",
        marker=dict(size=10, color="orange", opacity=0.8),
    )

    Layout = go.Layout(margin=dict(l=0, r=0, b=0, t=0))
    Figure = go.Figure(data=[Trace1, Trace2, Trace5, Trace6], layout=Layout)
    pio.write_html(Figure, file="sigmoid_one.html", auto_open=True)
    Figure.show()


def plot_two(xs, ys, y1, y2, f1, f2):
    y1_sigmoid = [sigmoid(f1(p)) for p in zip(xs, ys)]
    y2_sigmoid = [sigmoid(f2(p)) for p in zip(xs, ys)]

    Trace1_sigmoid = go.Scatter3d(
        x=xs,
        y=ys,
        z=y1_sigmoid,
        mode="markers",
        marker=dict(size=3, color="green", opacity=0.8),
    )

    Trace2_sigmoid = go.Scatter3d(
        x=xs,
        y=ys,
        z=y2_sigmoid,
        mode="markers",
        marker=dict(size=3, color="red", opacity=0.8),
    )

    # Adding points (0,0), (1,0), (0,1) and (1,1) for both functions
    important_points = [(0, 0), (1, 0), (0, 1), (1, 1)]
    important_sigmoid = [sigmoid(f1(p)) + sigmoid(f2(p)) for p in important_points]

    important_xs, important_ys = zip(*important_points)

    # Adding points (0,0), (1,0), (0,1) and (1,1) at y = 0
    Trace5 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=[0, 0, 0, 0],
        mode="markers",
        marker=dict(size=10, color="black", opacity=0.8),
    )

    Trace6 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=important_sigmoid,
        mode="markers",
        marker=dict(size=10, color="orange", opacity=0.8),
    )

    Layout = go.Layout(margin=dict(l=0, r=0, b=0, t=0))
    Figure = go.Figure(
        data=[Trace1_sigmoid, Trace2_sigmoid, Trace5, Trace6], layout=Layout
    )

    pio.write_html(Figure, file="sigmoid_two.html", auto_open=True)

    Figure.show()


def two_d_grid(xmin, xmax, ymin, ymax, steps):
    x = np.linspace(xmin, xmax, steps)
    y = np.linspace(ymin, ymax, steps)
    return np.meshgrid(x, y)


def plot_three(f1, f2):
    steps = 50

    x_grid, y_grid = two_d_grid(0, 1, 0, 1, steps)

    # Apply f1 and f2 and then sigmoid to the entire grid
    z_grid1 = (
        np.array(
            [
                sigmoid(f1((x_grid[j, i], y_grid[j, i])))
                for j in range(steps)
                for i in range(steps)
            ]
        )
        .reshape(steps, steps)
        .T
    )
    z_grid2 = (
        np.array(
            [
                sigmoid(f2((x_grid[j, i], y_grid[j, i])))
                for j in range(steps)
                for i in range(steps)
            ]
        )
        .reshape(steps, steps)
        .T
    )

    surface1 = go.Surface(
        x=x_grid, y=y_grid, z=z_grid1, colorscale="Greens", opacity=0.8
    )
    surface2 = go.Surface(x=x_grid, y=y_grid, z=z_grid2, colorscale="Reds", opacity=0.8)

    # Adding points (0,0), (1,0), (0,1) and (1,1) for both functions
    important_points = [(0, 0), (1, 0), (0, 1), (1, 1)]
    important_xs, important_ys = zip(*important_points)

    important_z1 = [sigmoid(f1(p)) for p in important_points]
    important_z2 = [sigmoid(f2(p)) for p in important_points]
    important_zsum = [sigmoid(f1(p)) + sigmoid(f2(p)) for p in important_points]

    TraceImportant1 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=important_z1,
        mode="markers",
        marker=dict(size=10, color="black", opacity=0.8),
    )

    TraceImportant2 = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=important_z2,
        mode="markers",
        marker=dict(size=10, color="black", opacity=0.8),
    )

    TraceImportantSum = go.Scatter3d(
        x=important_xs,
        y=important_ys,
        z=important_zsum,
        mode="markers",
        marker=dict(size=10, color="orange", opacity=0.8),
    )

    data = [surface1, surface2, TraceImportant1, TraceImportant2, TraceImportantSum]

    Layout = go.Layout(
        margin=dict(l=0, r=0, b=0, t=0),
        scene=dict(
            xaxis=dict(
                gridcolor="rgb(255, 255, 255)",
                zerolinecolor="rgb(255, 255, 255)",
                showbackground=True,
                backgroundcolor="rgb(230, 230,230)",
            ),
            yaxis=dict(
                gridcolor="rgb(255, 255, 255)",
                zerolinecolor="rgb(255, 255, 255)",
                showbackground=True,
                backgroundcolor="rgb(230, 230,230)",
            ),
            zaxis=dict(
                gridcolor="rgb(255, 255, 255)",
                zerolinecolor="rgb(255, 255, 255)",
                showbackground=True,
                backgroundcolor="rgb(230, 230,230)",
            ),
        ),
    )

    fig = go.Figure(data=data, layout=Layout)
    pio.write_html(fig, file="sigmoid.html", auto_open=True)
    fig.show()
