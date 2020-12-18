from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from app_test import tasks
from .status import status

# Create your views here.
def submit_job(request):
    sequence = request.POST.get("sequence")
    res = tasks.submit.delay(sequence)
    print("start running task")
    pid = res.id
    print(res.id)
    # print("async task res", res.get())
    return redirect(status, pid=pid)