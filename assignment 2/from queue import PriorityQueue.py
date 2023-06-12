from queue import PriorityQueue

# Define the graph as a dictionary
graph = {'A': {'B': 2, 'C': 4},
         'B': {'A': 2, 'C': 5, 'F': 2, 'D': 1},
         'C': {'A': 4, 'B': 5, 'D': 3, 'G': 2},
         'D': {'B': 1, 'C': 3, 'E': 3},
         'E': {'D': 3},
         'F': {'B': 2},
         'G': {'C': 2}}

def uniform_cost_search(graph, start, goal):
    frontier = PriorityQueue()
    frontier.put((0, start))
    explored = set()

    while not frontier.empty():
        cost, current_node = frontier.get()
        if current_node == goal:
            return cost

        explored.add(current_node)

        for neighbor, neighbor_cost in graph[current_node].items():
            if neighbor not in explored:
                total_cost = cost + neighbor_cost
                frontier.put((total_cost, neighbor))

    return -1

# Test the function
start_node = 'A'
goal_node = 'E'
cost = uniform_cost_search(graph, start_node, goal_node)
if cost != -1:
    print(f"The cost from node {start_node} to node {goal_node} is {cost}.")
else:
    print(f"There is no path from node {start_node} to node {goal_node}.")
