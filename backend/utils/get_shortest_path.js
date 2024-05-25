const fs = require("fs");
const routesWithFinalWeights = require('./routes_with_final_weights.json');

// In this modified implementation, we stop the Dijkstra's algorithm when we encounter the endNode. Then, we reconstruct the shortest path by backtracking from the endNode to the startNode using the previous object that stores the predecessor of each node. Finally, we return the shortest distance and the shortest path route from the startNode to the endNode.
function get_shortest_path(source_airport_id, destination_airport_id) {

  function dijkstra(adjacencyList, startNode, endNode) {
    // Initialize distances to all nodes as Infinity and start node as 0
    const distances = {};
    for (let node in adjacencyList) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;

    // Priority queue to store nodes with their distances
    const priorityQueue = [[startNode, 0]];

    // Initialize previous nodes
    const previous = {};

    // Main loop
    while (priorityQueue.length > 0) {
      // Sort queue by distance
      priorityQueue.sort((a, b) => a[1] - b[1]);

      const [currentNode, currentDistance] = priorityQueue.shift();

      // Stop if we reached the end node
      if (currentNode === endNode) break;
      // Iterate through the neighbors of currentNode
      for (let neighbor of adjacencyList[currentNode]) {
        const { node, weight } = neighbor;

        // Calculate new distance to neighbor
        const distanceToNeighbor = currentDistance + weight;

        // Update distance and previous node if shorter path is found
        if (distanceToNeighbor < distances[node]) {
          distances[node] = distanceToNeighbor;
          previous[node] = currentNode;
          priorityQueue.push([node, distanceToNeighbor]);
        }
      }
    }

    // Reconstruct the shortest path
    const shortestPath = [];
    let currentNode = endNode;
    while (currentNode !== startNode) {
      shortestPath.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    shortestPath.unshift(startNode);

    return { shortestPath };
  }

  // Function to create an adjacency list from the data
  function createAdjacencyList(data) {
    const adjacencyList = {};

    // Iterate through the data
    data.forEach(edge => {
      const { source, destination, routeWeight } = edge;

      // If source node is not in adjacency list, add it
      if (!adjacencyList[source]) {
        adjacencyList[source] = [];
      }

      // If destination node is not in adjacency list, add it
      if (!adjacencyList[destination]) {
        adjacencyList[destination] = [];
      }
      // Add destination node to source node's adjacency list with weight
      adjacencyList[source].push({ node: destination, weight: routeWeight });
    });

    return adjacencyList;
  }
  const adjacencyList = createAdjacencyList(routesWithFinalWeights);

  const { shortestPath } = dijkstra(adjacencyList, 'ABZ', 'TUN');

  function createRoutes(routeData, routeArray) {
    const routes = [];
    let totalDistance = 0;

    for (let i = 0; i < routeArray.length - 1; i++) {
      const sourceAirport = routeArray[i];
      const destinationAirport = routeArray[i + 1];
      const route = routeData.find(route => route.source === sourceAirport && route.destination === destinationAirport);

      if (route) {
        const haversineDistance = route.haversineDistance;
        totalDistance += haversineDistance;

        routes.push({
          routeNumber: i + 1,
          source: route.source,
          destination: route.destination,
          haversineDistance: haversineDistance,
          sourceLatitude: route.source_latitude,
          sourceLongitude: route.source_longitude,
          destinationLatitude: route.destination_latitude,
          destinationLongitude: route.destination_longitude,
          weatherWeight: route.weatherWeight,
          routeWeight: route.routeWeight
        });
      }
    }

    return {
      route: routes,
      totalHaversineDistance: totalDistance
    };
  }

  let final_shortest_routes = createRoutes(routesWithFinalWeights, shortestPath);
  return final_shortest_routes;
}

module.exports = { get_shortest_path }