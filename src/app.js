var app = angular.module("EvaluationApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/login.html",
		controller: "loginCtrl"
	}).when("/home", {
		templateUrl: "templates/home.html",
		controller: "HomeController"
	}).when("/templates/", {
		templateUrl: "templates/template.html",
		controller: "TemplateController"
	}).when("/templates/n/:templateID", {
		templateUrl: "templates/newTemplate.html",
		controller: "TemplateController"
	}).when("/templates/:templateID", {
		templateUrl: "templates/template.html",
		controller: "TemplateController"
	}).when("/evaluation/:evaluationID", {
		templateUrl: "templates/answerEval.html",
		controller: "EvaluationController"
	}).when("/evaluation/", {
		templateUrl: "templates/evaluation.html",
		controller: "EvaluationController"
	}).when("/result/:resultID", {
		templateUrl: "templates/result.html",
		controller: "ResultController"
	}).when("/result/", {
		templateUrl: "templates/result.html",
		controller: "ResultController"
	}).otherwise({ redirectTo: "/"});
});