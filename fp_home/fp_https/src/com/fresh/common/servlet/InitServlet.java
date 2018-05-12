package com.fresh.common.servlet;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import com.unionpay.acp.sdk.SDKConfig;

/**
 * 初始化系统常用的参数值
 * 
 * 
 * @Title: InitServlet.java
 * @author 于采兴
 * @version V2.0 2015-7-28 下午03:18:46 新建
 */
@SuppressWarnings("serial")
public class InitServlet extends HttpServlet {

    /**
     * 存放配置的Map
     */
    private static Map<String, String> sysConfigs = new HashMap<String, String>();

    private static Log logger = LogFactory.getLog(InitServlet.class);

    public void init(ServletConfig config) throws ServletException {
        String path = config.getServletContext().getRealPath("/") + config.getInitParameter("configFilePath");
        config.getServletContext().setAttribute("sysConfigs", parseXML(path));
        SDKConfig.getConfig().loadPropertiesFromSrc();// 从classpath加载acp_sdk.properties文件
    }

    private static Map<String, String> parseXML(String path) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(path);
            NodeList configs = document.getElementsByTagName("config");
            for (int i = 0; i < configs.getLength(); i++) {
                Node config = configs.item(i);
                sysConfigs.put(config.getAttributes().getNamedItem("name").getNodeValue(), config.getAttributes()
                        .getNamedItem("value").getNodeValue());
            }
        } catch (Exception e) {
            logger.error("系统常用的参数初始化错误");
        }
        return sysConfigs;
    }
}