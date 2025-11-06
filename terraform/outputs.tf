output "container_names" {
  value = [
    docker_container.mongo.name,
    docker_container.backend.name,
    docker_container.frontend.name
  ]
}
