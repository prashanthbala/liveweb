package controllers
import collection.mutable.{HashMap, HashSet}
import play.api.mvc.{Action, Controller, WebSocket}
import play.api.libs.iteratee.{PushEnumerator, Iteratee, Enumerator}
import play.api.Logger
import collection.mutable

object Application extends Controller {

  val connections = HashMap.empty[String, HashSet[PushEnumerator[String]]]
  
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def websockets(id: String) = WebSocket.using[String] {request =>
    val out = Enumerator.imperative[String]()

    connections.getOrElseUpdate(id, {val set = new HashSet[PushEnumerator[String]].empty; set.add(out); set}).add(out)

    val in = Iteratee.foreach[String](content => {

      Logger debug content

      val key = """<div id="annotate-overlay-layer" class="overlay-layer">"""
      val replacement = """<div id="annotate-overlay-layer">"""
      val regex = new scala.util.matching.Regex(key)
      val replacedContent = regex.replaceAllIn(content, replacement)

      val discardThis = """{"tag":"input#annotate-checkbox","type":"click"}"""

      if (content != discardThis)
            connections.getOrElse(id, throw new Exception("It has to be created before")).map {_.push(replacedContent)}
    }).mapDone(_ => {
      //disconnected
      connections getOrElse(id, throw new Exception("It had to be there before")) remove out
    })

    (in, out)
  }
  
}