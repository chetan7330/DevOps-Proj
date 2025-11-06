terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}
provider "docker" {}
# Mongo container
resource "docker_container" "mongo" {
  name  = "tf-mongo"
  image = "mongo:5"
  ports {
    internal = 27017
    external = 27018
  }
}
# Backend container
resource "docker_image" "backend_image" {
  name = "student-backend:latest"
  keep_locally = true
}
resource "docker_container" "backend" {
  name  = "tf-backend"
  image = docker_image.backend_image.name
  ports {
    internal = 3001
    external = 3002
  }
  env = [
    "MONGO_URI=mongodb://tf-mongo:27017/mydb"
  ]
  depends_on = [docker_container.mongo]
}
# Frontend container
resource "docker_image" "frontend_image" {
  name = "student-frontend:latest"
  keep_locally = true
}
resource "docker_container" "frontend" {
  name  = "tf-frontend"
  image = docker_image.frontend_image.name
  ports {
    internal = 80
    external = 3004
  }
  depends_on = [docker_container.backend]
}
