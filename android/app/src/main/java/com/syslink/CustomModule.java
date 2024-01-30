package com.syslink;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import com.jcraft.jsch.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.concurrent.ExecutionException;

public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;




    public static String cd="";             //displays which directory are we in
    public static String temp2="";          //used in backend logic of changing directories
    public static int count = 0;            //used in file manager directory detection
    public static Boolean flag = false;    //to fulfill initial init of cd and temp2 variables once app is started
    public static Boolean flag2 = false;   //to take input after 1 iteration of filemanager's loop
    public static Boolean connectionflag = false;
    public static String ip;
    public static String username;
    public static String password;
    public static long endtime = 0;

    //--------------------------------------------------------------------------------------------------------------------------
    public static String power;
    public static String cpu;
    public static String ram;
    public static String uptime;
    public static String wifi;
    public static String process;
    public static String location;
    public static String users;


    CustomModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void show(Promise promise){

        String temp = "gghh";
        Toast.makeText(reactContext,"Hi from android",Toast.LENGTH_LONG).show();
        promise.resolve(temp);
    }

    @ReactMethod
    public static void getCD(Promise promise){
        promise.resolve(cd);
    }
    @ReactMethod
    public static void clear(Promise promise){
        cd="";
        temp2="";
        count = 0;
        flag = false;
        flag2 = false;
        connectionflag = false;
        promise.resolve("done");
    }

    @NonNull
    @Override
    public String getName() {
        return "ABC";
    }

//    @ReactMethod
//    public String executeCommand(String ip, String username, String password, String command) {
//        CommandExecution commandExecution = new CommandExecution();
//        try {
//            return commandExecution.execute(ip, username, password, command).get();
//        } catch (ExecutionException e) {
//            return e.getMessage();
//        } catch (InterruptedException e) {
//            return e.getMessage();
//        }
//    }

    @ReactMethod
    public static String parentfilemanager(String ip, String username, String password, String input, Promise promise) {
        if(!flag) {
            cd = ExecuteCommand2(ip, username, password, "pwd");
            if(cd.compareTo("-1")==0)
                promise.reject("error");
            else if (cd.length() >= 2) {
                int newLength = cd.length() - 1;
                cd = cd.substring(0, newLength);
                temp2=cd;
            }
            flag = true;
        }
        String display = filemanager(ip, username, password, input, promise);

        promise.resolve(display);
        return display;
    }
    public static String filemanager(String ip, String username, String password, String input, Promise promise){
        if(cd.compareTo("")==0){
            cd  = ExecuteCommand2(ip,username,password,"pwd");
            if(cd.compareTo("-1")==0)
                promise.reject("error");
        }
        else if(input.compareTo("b") == 0 && cd.compareTo(temp2)==0) {   //cd ..
            cd ="/home";
            count = 1;
        }
        else if(count == 1 && input.compareTo("b")==0 && cd.compareTo("/home")==0){     // cd ../..
            if(count == 1)
                cd = "../..";
            count = 2;
        }
        else if(count == 1 && input.compareTo("b")==0 ){     // cd ../..
            if(count == 1)
                cd = "../..";
            count = 2;
        }
        else if(count == 2 && input.compareTo("b")==0){
            cd = "../..";
        }
        else if(count == 2){
            if(input.contains("home"))
                count = 1;
            else
                count = 3;
            cd = "/" + input;
        }
        else if(count == 3 && input.compareTo("b")==0){
            if(cd.compareTo("../..")==0){}
            else{
                int lastIndex = cd.lastIndexOf("/");
                if (lastIndex >= 0) {
                    cd = cd.substring(0, lastIndex);
                }
            }
            if (cd.compareTo("") == 0)
                cd = "../..";
        }
        else if (input.compareTo("b") == 0) {   //backward jaana
            count = 0;
            int lastIndex = cd.lastIndexOf("/");
            if (lastIndex >= 0) {
                cd = cd.substring(0, lastIndex);
            }
        }
        else{   //forward jaana
            if(count != 3)
                count = 0;
            cd = cd + "/" + input;
        }
        String temp = ExecuteCommand2(ip,username,password,"cd " + cd + " ; ls -F");
        if(temp.compareTo("-1")==0)
            promise.reject("error");

        return temp;
    }



//    private class CommandExecution extends AsyncTask<String, Void, String> {//This class will execute commands on remote server
//        private String output = "";//-------------------------------------------------
//
//
//        @Override
//        protected String doInBackground(String... params) {
//            try {
//                JSch jsch = new JSch();
//                Session session = jsch.getSession(params[1], params[0], 22);
//                session.setPassword(params[2]);
//                session.setConfig("StrictHostKeyChecking", "no");
//                session.setConfig("PreferredAuthentications", "publickey,keyboard-interactive,password");
//                session.setConfig("ConnectTimeout", "2000"); // 5 second timeout
//                session.connect();
//                ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
//                channelExec.setCommand(params[3]);
////                channelExec.setErrStream(System.err);
//
////                InputStream in = channelExec.getInputStream();
//                channelExec.connect();
////                byte[] tmp = new byte[1024];
////                while (true) {
////                    while (in.available() > 0) {
////                        int i = in.read(tmp, 0, 1024);
////                        if (i < 0) break;
////                        output += (new String(tmp, 0, i));
////                    }
////                    if (channelExec.isClosed()) {
////                        if (in.available() > 0) continue;
////                        output += ("exit-status: " + channelExec.getExitStatus());
////                        break;
////                    }
////                    try {
////                        Thread.sleep(1000);
////                    } catch (Exception e) {
////                        output +=(e);
////                    }
////                }
//                // Read output from channel
//                InputStream inputStream = channelExec.getInputStream();
//                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
//                String line="";
//                while ((line = reader.readLine()) != null) {
//                    output += line + "\n";
//                }
//
//                channelExec.disconnect();
//                session.disconnect();
//            } catch (JSchException | IOException e) {
//                String errorMessage = e.getMessage();
//                e.printStackTrace();
//                output = errorMessage + "Command NOT executed";
//            }
//            Log.d("MyAsyncTask", "CommandExecution Async output:"+output+"---------------------");
//            return output;
//        }
//        //        protected void onProgressUpdate(String... values) {
////            super.onProgressUpdate(values);
////            info = "[INFO] No Errors :)";
////            if (values.length > 0) {
////                info = values[0]; // retrieve the string
////            }
////        }
//        protected String onPostExecute(String ...result) {// This block will run after completion of doInBackground block
////            listener.onSSHOutput(info);
////            connectedsession = result[0];
//            return output;
//        }
//    }
    public static String ExecuteCommand2(String ip, String username, String password, String command) {
        String output = "";
        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, ip, 22);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.setConfig("PreferredAuthentications", "publickey,keyboard-interactive,password");
            session.setConfig("ConnectTimeout", "1"); // 5 second timeout
            session.connect();
            ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
            channelExec.setCommand(command);
            channelExec.connect();
            InputStream inputStream = channelExec.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line="";
            while ((line = reader.readLine()) != null) {
                output += line + "\n";
            }
            channelExec.disconnect();
            session.disconnect();
            Log.d("MyAsyncTask", "ExecuteCommand output: " + output + "---------------------");
            return output;
        }
        catch (JSchException | IOException e) {
            String errorMessage = e.getMessage();
            e.printStackTrace();
            output = errorMessage + "Command NOT executed";
            Log.d("MyAsyncTask", "ExecuteCommand output: " + output + "---------------------");
            return "-1";
        }
    }

    @ReactMethod
    public static void ExecuteCommand(String ip, String username, String password, String command, Promise promise) {
        String output = "";
        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, ip, 22);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.setConfig("PreferredAuthentications", "publickey,keyboard-interactive,password");
            session.setConfig("ConnectTimeout", "1"); // 5 second timeout
            session.connect();
            ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
            channelExec.setCommand(command);
            channelExec.connect();
            InputStream inputStream = channelExec.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line="";
            while ((line = reader.readLine()) != null) {
                output += line + "\n";
            }
            channelExec.disconnect();
            session.disconnect();
            Log.d("MyAsyncTask", "ExecuteCommand output: " + output + "---------------------");
            promise.resolve(output);
        }
        catch (JSchException | IOException e) {
            String errorMessage = e.getMessage();
            e.printStackTrace();
            output = errorMessage + "Command NOT executed";
            Log.d("MyAsyncTask", "ExecuteCommand output: " + output + "---------------------");
            promise.reject("Command NOT executed", e);
        }
    }


    public static void ConnectionStatus (String ip, String username, String password, Promise promise){
        Log.d("MyAsyncTask", "ConnectionStatus is ranned  ---------------------");
        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, ip, 22);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect(2000);
            session.disconnect();
            connectionflag = true;
            promise.resolve(true);
        } catch (JSchException e) {
            String errorMessage = e.getMessage();
            e.printStackTrace();
            connectionflag = false;
            promise.resolve(false);
        }
    }
    @ReactMethod
    public static void parentConnectionStatus (String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ConnectionStatus(ip,username,password,promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static Boolean ParentConnectionStatus (String ip, String username, String password, Promise promise){
        parentConnectionStatus (ip, username, password, promise);
        Log.d("MyAsyncTask", "ParentConnectionStatus output: " + connectionflag + "---------------------");
        return connectionflag;
    }

    //################@#$@$#@%#%@#$%@#$%$#@%$#%@$#%$^&^%%$^%$@#^@%^$%^&%$@^%$^$#%^%$@^$%#^$@#^$%#^@$$#^@#$%^$#^@^$#@$%#@%$#^@#%$#%$&^%$*%^&$&^&#%$^@$#^@#%$#
    @ReactMethod
    public static void volume(String ip, String username, String password, int vol, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "/syslink/command/volume.syslink "+vol, promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void powermanagement(String ip, String username, String password, int protocol, int min, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                if(protocol == 1)
                    ExecuteCommand(ip,username,password, "/syslink/command/shutdown.syslink "+password, promise);
                else if(protocol == 2)
                    ExecuteCommand(ip,username,password, "/syslink/command/reboot.syslink "+password, promise);
                else if(protocol == 3)
                    ExecuteCommand(ip,username,password, "/syslink/command/shutdown.syslink "+password+" "+min, promise);
                else if(protocol == 4)
                    ExecuteCommand(ip,username,password, "/syslink/command/reboot.syslink "+password+" "+min, promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void usersDesc(String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "cat /tmp/syslink/regularusers ; cat /tmp/syslink/loggedinusers", promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void processDesc(String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "cat /tmp/syslink/top", promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void wifiinfo(String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "cat /tmp/syslink/connectiontype ; cat /tmp/syslink/hostname ; cat /tmp/syslink/interfacename ; cat /tmp/syslink/interfacetype ; cat /tmp/syslink/ip", promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void Diskusage(String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "cat /tmp/syslink/diskinfo", promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void realtimeDesc(String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                ExecuteCommand(ip,username,password, "cat /tmp/syslink/sysinfo", promise);
            }
        });
        thread.start();
    }
    @ReactMethod
    public static void Pcpu (String ip, String username, String password, Promise promise){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                Ccpu(ip,username,password, promise);
            }
        });
        thread.start();
    }

    public static void Ccpu (String ip, String username, String password, Promise promise){
        cpu = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/cpuusage");
        if(cpu=="-1")
            promise.reject("");
        ram = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/memusage");
        if(ram=="-1")
            promise.reject("");
        uptime = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/uptime");
        if(uptime=="-1")
            promise.reject("");
        wifi = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/speedtest");
        if(wifi=="-1")
            promise.reject("");
        process = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/processcount");
        if(process=="-1")
            promise.reject("");
        location = ExecuteCommand2(ip,username,password, "cat /tmp/syslink/location");
        if(location=="-1")
            promise.reject("");

        promise.resolve("");
    }
    @ReactMethod
    public static void getcpu(Promise promise){
        promise.resolve(cpu);
    }
    @ReactMethod
    public static void getram(Promise promise){
        promise.resolve(ram);
    }
    @ReactMethod
    public static void getuptime(Promise promise){
        promise.resolve(uptime);
    }
    @ReactMethod
    public static void getwifi(Promise promise){
        promise.resolve(wifi);
    }
    @ReactMethod
    public static void getprocess(Promise promise){
        promise.resolve(process);
    }
    @ReactMethod
    public static void getlocation(Promise promise){
        promise.resolve(location);
    }
    @ReactMethod
    public static void getusers(Promise promise){
        promise.resolve(users);
    }

}
