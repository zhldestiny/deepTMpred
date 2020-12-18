from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from app_test import tasks
from celery.result import AsyncResult
import json


# Create your views here.
def status(request, pid):
    # print("async task res", res.get())
    task = AsyncResult(pid)
    status = task.status
    print(status)
    result = ""
    if status == "SUCCESS":
        result = task.result
    return render(request, "status.html", {"pid": pid, "status": status,"result": result, "resultDict": json.dumps(result)})

# def update_status(request, pid):
#     task = AsyncResult(pid)
#     status = task.status
#     result = task.result
#     update_status_dict = {"result": result, "status": status}
#     return JsonResponse(update_status_dict)