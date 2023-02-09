package com.octopus.teraHire.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
    private static Connection connection= null;

    public static Connection getConnection(){
        if(connection != null){
            return connection;
        }
        else{
            String driver ="com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/octopus?useSSl=false";
            String user= "root";
            String password= "Teranet@2022";

            try {
                Class.forName(driver);
                connection = DriverManager.getConnection(url, user, password);
            } catch (ClassNotFoundException | SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return connection;
    }
}
